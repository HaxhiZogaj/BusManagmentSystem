﻿using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace BusMNG.DTOs
{
    public class UserDto
    {
    }

    public class RegisterRequest
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string Role { get; set; } = "Customer";
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }

    public class LogoutRequest
    {
        public Guid SessionId { get; set; }
    }

}
