using System;
namespace WebBuilderBackend.Models
{
	public class Users
	{
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool? premium { get; set; }
        public string? Role { get; set; }
    }
}
