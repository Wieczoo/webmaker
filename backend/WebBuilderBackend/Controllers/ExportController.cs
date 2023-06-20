using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;
using WebBuilderBackend.Models;

[ApiController]
[Route("api/[controller]")]
public class ExportController : ControllerBase
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ExportController(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    [HttpPost]
    public IActionResult ExportHtml([FromBody] htmlExport exportData)
    {
        if (exportData is null)
        {
            return BadRequest("Invalid data");
        }

        // Sprawdź, czy istnieje katalog o nazwie Email w folderze wwwroot
        string emailFolder = Path.Combine(_webHostEnvironment.WebRootPath, exportData.Email);
        if (!Directory.Exists(emailFolder))
        {
            // Jeśli katalog nie istnieje, utwórz go
            Directory.CreateDirectory(emailFolder);
        }

        // Sprawdź, czy liczba elementów w tablicach Names i Htmls jest zgodna
        if (exportData.Names.Length != exportData.Htmls.Length)
        {
            return BadRequest("Invalid data: Names and Htmls arrays have different lengths");
        }

        // Iteruj przez tablice Names i Htmls
        for (int i = 0; i < exportData.Names.Length; i++)
        {
            string name = exportData.Names[i];
            string htmlBase64 = exportData.Htmls[i];

            // Dekoduj HTML z Base64
            byte[] htmlBytes = Convert.FromBase64String(htmlBase64);
            string decodedHtml = Encoding.UTF8.GetString(htmlBytes);

            // Utwórz plik o nazwie Name wewnątrz katalogu Email z dekodowanym HTML
            string filePath = Path.Combine(emailFolder, name + ".html");
            System.IO.File.WriteAllText(filePath, decodedHtml);
        }

        return Ok("Files exported successfully");
    }

    [HttpDelete("delete")]
    public IActionResult DeleteFile([FromBody] DeleteFileRequest deleteRequest)
    {
        if (deleteRequest is null)
        {
            return BadRequest("Invalid request");
        }

        // Utwórz ścieżkę pliku na podstawie podanych informacji
        string filePath = Path.Combine(_webHostEnvironment.WebRootPath, deleteRequest.Email, deleteRequest.Name);

        try
        {
            // Sprawdź, czy plik istnieje
            if (System.IO.File.Exists(filePath))
            {
                // Usuń plik
                System.IO.File.Delete(filePath);
                return Ok("File deleted successfully");
            }
            else
            {
                return NotFound("File not found");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error deleting file: {ex.Message}");
        }
    }

    [HttpGet("files")]
    public IActionResult GetFiles([FromQuery] string folderPath)
    {
        if (string.IsNullOrEmpty(folderPath))
        {
            return BadRequest("Folder path is required");
        }

        // Utwórz pełną ścieżkę folderu na podstawie podanego folderPath
        string fullFolderPath = Path.Combine(_webHostEnvironment.WebRootPath, folderPath);

        try
        {
            // Sprawdź, czy folder istnieje
            if (!Directory.Exists(fullFolderPath))
            {
                return NotFound("Folder not found");
            }

            // Pobierz listę plików w folderze
            string[] files = Directory.GetFiles(fullFolderPath);

            // Pobierz tylko nazwy plików bez ścieżek
            string[] fileNames = files.Select(Path.GetFileName).ToArray();

            return Ok(fileNames);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error getting files: {ex.Message}");
        }
    }

    [HttpGet("Allfiles")]
    public IActionResult GetAllFiles()
    {
        // Utwórz pełną ścieżkę folderu na podstawie podanego folderPath
        string fullFolderPath = Path.Combine(_webHostEnvironment.WebRootPath);

        try
        {
            // Sprawdź, czy folder istnieje
            if (!Directory.Exists(fullFolderPath))
            {
                return NotFound("Folder not found");
            }

            // Pobierz listę plików w folderze i podfolderach
            string[] files = Directory.GetFiles(fullFolderPath, "*", SearchOption.AllDirectories);

            // Utwórz słownik dla przechowywania wyników
            var result = new Dictionary<string, List<string>>();

            // Przetwórz każdy plik
            foreach (var filePath in files)
            {
                string fileName = Path.GetFileName(filePath);
                string directoryName = Path.GetFileName(Path.GetDirectoryName(filePath));

                // Sprawdź, czy istnieje wpis dla nazwy folderu w wynikach
                if (!result.ContainsKey(directoryName))
                {
                    result[directoryName] = new List<string>();
                }

                // Dodaj plik do listy plików w folderze
                result[directoryName].Add(fileName);
            }

            // Utwórz listę wynikową z odpowiednią strukturą
            var resultList = new List<object>();
            foreach (var entry in result)
            {
                resultList.Add(new
                {
                    dirname = entry.Key,
                    files = entry.Value
                });
            }

            return Ok(resultList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error getting files: {ex.Message}");
        }
    }
}