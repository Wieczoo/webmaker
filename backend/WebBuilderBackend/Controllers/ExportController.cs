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

        // Dekoduj HTML z Base64
        byte[] htmlBytes = Convert.FromBase64String(exportData.Html);
        string decodedHtml = Encoding.UTF8.GetString(htmlBytes);

        // Utwórz plik o nazwie Name wewnątrz katalogu Email z dekodowanym HTML
        string filePath = Path.Combine(emailFolder, exportData.Name + ".html");
        System.IO.File.WriteAllText(filePath, decodedHtml);

        return Ok("File exported successfully");
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
}