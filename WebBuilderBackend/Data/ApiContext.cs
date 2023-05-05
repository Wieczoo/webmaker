using System;
using Microsoft.EntityFrameworkCore;
using WebBuilderBackend.Models;

namespace WebBuilderBackend.Data
{
	public class ApiContext : DbContext
	{
		public DbSet<Users> Users { get; set; }

		public ApiContext(DbContextOptions<ApiContext> options) : base(options)
		{
		}
	}
}

