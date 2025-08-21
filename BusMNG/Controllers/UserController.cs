using BusMNG.DTOs;
using BusMNG.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly BusKosovaContext _context;

    public UsersController(BusKosovaContext context)
    {
        _context = context;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] BusMNG.DTOs.RegisterRequest registerRequest)
    {
        if (_context.Users.Any(u => u.Email == registerRequest.Email))
            return BadRequest(new { message = "Email already registered." });

        var salt = BCrypt.Net.BCrypt.GenerateSalt();
        var hash = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password); 

        var user = new User
        {
            FullName = registerRequest.FullName,
            Email = registerRequest.Email,
            PasswordSalt = salt,
            PasswordHash = hash,
            Role = registerRequest.Role ?? "Customer" 
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully!", role = user.Role });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] BusMNG.DTOs.LoginRequest loginRequest)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
        if (user == null)
            return Unauthorized(new { message = "User not found" });

        // ✅ Ensure role is NOT validated during login
        if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            return Unauthorized(new { message = "Incorrect password" });

        var token = Guid.NewGuid().ToString();
        var tokenHash = BCrypt.Net.BCrypt.HashPassword(token);

        var session = new UserSession
        {
            UserId = user.UserId,
            TokenHash = tokenHash,
            ExpiresAt = DateTime.UtcNow.AddHours(6)
        };

        _context.UserSessions.Add(session);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            token,
            sessionId = session.SessionId,
            fullName = user.FullName,
            role = user.Role
        });
    }

}

