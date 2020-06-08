using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ExcelDataProcessor.Controllers {
    [Route("api/[controller]")]
    public class DataProcessorController : Controller {

        [HttpPost("[action]")]
        public IActionResult ProcessExcel([FromBody]ExcelData excelData) {
            var base64String = excelData.File;
            string dataString = base64String.Substring(base64String.IndexOf(',') + 1);
            byte[] byteArray = Convert.FromBase64String(dataString);
            var fileName = "dataFile.xlsx";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\DataFile", fileName);
            System.IO.File.WriteAllBytes(filePath, byteArray);
            var datainfo = GetDataFromExcel(filePath);
            var response = MapToExtractObject(datainfo);
            return Json(response);
        }

        public static DataTable GetDataFromExcel(string path) {
            //Save the uploaded Excel file.

            DataTable dt = new DataTable();
            //Open the Excel file using ClosedXML.
            using (XLWorkbook workBook = new XLWorkbook(path)) {
                //Read the first Sheet from Excel file.
                IXLWorksheet workSheet = workBook.Worksheet(1);

                //Create a new DataTable.

                //Loop through the Worksheet rows.
                bool firstRow = true;
                foreach (IXLRow row in workSheet.Rows()) {
                    //Use the first row to add columns to DataTable.
                    if (firstRow) {
                        foreach (IXLCell cell in row.Cells()) {
                            if (!string.IsNullOrEmpty(cell.Value.ToString())) {
                                dt.Columns.Add(cell.Value.ToString());
                            } else {
                                break;
                            }
                        }
                        firstRow = false;
                    } else {
                        int i = 0;
                        DataRow toInsert = dt.NewRow();
                        foreach (IXLCell cell in row.Cells(1, dt.Columns.Count)) {
                            try {
                                toInsert[i] = cell.Value.ToString();
                            } catch (Exception ex) {

                            }
                            i++;
                        }
                        dt.Rows.Add(toInsert);
                    }
                }
                return dt;
            }
        }

        private ExtractedExcelData MapToExtractObject(DataTable datainfo) {
            var extractedInfo = new ExtractedExcelData();
            var headers = new List<string>();
            foreach (var headerData in datainfo.Columns) {
                headers.Add(headerData.ToString());
            }
            extractedInfo.ExcelHeaders = headers;
            var dataContent = new List<RowData>();
            foreach (DataRow rowData in datainfo.Rows) {
                var dataTableRow = rowData.ItemArray;
                var extractData = new RowData();
                var rowText = new List<string>();
                foreach (var rowItem in dataTableRow) {
                    rowText.Add(rowItem.ToString());
                }
                extractData.CellValues = rowText;
                dataContent.Add(extractData);
            }
            extractedInfo.ExcelRowContent = dataContent;
            return extractedInfo;
        }

        public class ExcelData {
            public string File { get; set; }
        }

        public class ExtractedExcelData{
            public List<string> ExcelHeaders { get; set; }
            public List<RowData> ExcelRowContent { get; set; }
        }

        public class RowData {
            public List<string> CellValues { get; set; }
        }
    }
}
