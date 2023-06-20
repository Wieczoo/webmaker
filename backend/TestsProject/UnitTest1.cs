using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebBuilderBackend.Controllers;
using WebBuilderBackend.Data;
using WebBuilderBackend.Models;
using Xunit;

namespace WebBuilderBackend.Tests
{
    public class UsersControllerTests
    {
        private ApiContext _context;
        private UsersController _controller;
        private AuthenticationController _controllerA;

        public UsersControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApiContext>().UseInMemoryDatabase(databaseName: "TestDatabase").Options;

            _context = new ApiContext(options);
            _controller = new UsersController(_context);
            _controllerA = new AuthenticationController(_context);
        }

        [Fact]
        public void CreateEdit_WithExistingUserId_ReturnsOkResult()
        {
            // Arrange
            var existingUser = new Users
            {
                Id = 100,
                Email = "existing@example.com",
                // Set other properties as needed
            };
            _context.Users.Add(existingUser);
            _context.SaveChanges();

            var updatedUser = new Users
            {
                Id = 1,
                Email = "updated@example.com",
                // Set other properties as needed
            };

            // Act
            var result = _controller.CreateEdit(updatedUser);

            // Assert
            var jsonResult = Assert.IsType<OkObjectResult>(result.Value);
            Assert.Equal(200, jsonResult.StatusCode);
            Assert.Equal(updatedUser, jsonResult.Value);
        }

        [Fact]
        public void CreateEdit_WithNonExistingUserId_ReturnsNotFoundResult()
        {
            // Arrange
            var nonExistingUser = new Users
            {
                Id = 100,
                Email = "nonexisting@example.com",
                // Set other properties as needed
            };

            // Act
            var result = _controller.CreateEdit(nonExistingUser);

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(null, jsonResult.StatusCode);
        }

        [Fact]
        public void GetAll_WithAuthorizedUser_ReturnsOkResult()
        {
            // Act
            var result = _controller.GetAll();

            // Assert
            var jsonResult = Assert.IsType<JsonResult>(result);
            Assert.Equal(null, jsonResult.StatusCode);
            Assert.IsType<OkObjectResult>(jsonResult.Value);
        }


        //////////////////////////////////////////

        

        [Fact]
        public void Login_WithInvalidCredentials_ReturnsUnauthorizedResult()
        {
            // Arrange
            var login = new Login
            {
                Email = "test@example.com",
                Password = "incorrectpassword"
            };

            // Act
            var result = _controllerA.Login(login) as UnauthorizedResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(401, result.StatusCode);
        }

        [Fact]
        public void Login_WithInvalidRequest_ReturnsBadRequestResult()
        {
            // Arrange
            Login login = null;

            // Act
            var result = _controllerA.Login(login) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode);
            Assert.Equal("Invalid user request!!!", result.Value);
        }

        [Fact]
        public void Users_WithValidUser_ReturnsOkResultWithToken()
        {
            // Arrange
            var user = new Users
            {
                Email = "test@example.com",
                Password = "password"
            };

            // Act
            var result = _controllerA.Users(user) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);

            var response = result.Value as JWTTokenResponse;
            Assert.NotNull(response);
            Assert.NotNull(response.Token);
        }

   

        [Fact]
        public void Users_WithInvalidRequest_ReturnsBadRequestResult()
        {
            // Arrange
            Users user = null;

            // Act
            var result = _controllerA.Users(user) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal(400, result.StatusCode);
            Assert.Equal("Invalid user request!!!", result.Value);
        }



    }
}
