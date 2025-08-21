using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


[ApiController]
[Route("api/[controller]")]
public class RezervimetController : ControllerBase
{
    private readonly IRezervimService _rezervimService;

    public RezervimetController(IRezervimService rezervimService)
    {
        _rezervimService = rezervimService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllBookings()
    {
        var bookings = await _rezervimService.GetAllBookings();
        return bookings.Any() ? Ok(bookings) : NotFound(new { success = false, message = "No bookings found" });
    }

    [HttpGet("selectForDropdown")]
    public async Task<IActionResult> SelectForRezervimDropdownAsync()
    {
        var rezervimet = await _rezervimService.SelectForRezervimDropdownAsync();
        return Ok(rezervimet);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookingById(int id)
    {
        var booking = await _rezervimService.GetBookingById(id);
        return booking != null ? Ok(booking) : NotFound(new { success = false, message = "Booking not found" });
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddBooking([FromBody] RezervimetViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _rezervimService.AddBooking(model);
        return Ok(new { success = true, message = "Booking added successfully", bookingId = model.RezervimiId });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateBooking([FromBody] RezervimetViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _rezervimService.UpdateBooking(model);
        return Ok(new { success = true, message = "Booking updated successfully" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        await _rezervimService.DeleteBooking(id);
        return Ok(new { success = true, message = "Booking deleted successfully" });
    }
}