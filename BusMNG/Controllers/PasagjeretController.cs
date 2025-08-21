using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PasagjeretController : ControllerBase
{
    private readonly IPasagjerService _pasagjerService;

    public PasagjeretController(IPasagjerService pasagjerService)
    {
        _pasagjerService = pasagjerService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllPassengers()
    {
        var passengers = await _pasagjerService.GetAllPassengers();
        return passengers.Any() ? Ok(passengers) : NotFound(new { success = false, message = "No passengers found" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPassengerById(int id)
    {
        var passenger = await _pasagjerService.GetPassengerById(id);
        return passenger != null ? Ok(passenger) : NotFound(new { success = false, message = "Passenger not found" });
    }

    [HttpGet("selectForDropdown")]
    public async Task<IActionResult> SelectForDropdownAsync()
    {
        var pasagjeret = await _pasagjerService.SelectForDropdownAsync();
        return Ok(pasagjeret);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddPassenger([FromBody] PasagjeretViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _pasagjerService.AddPassenger(model);
        return Ok(new { success = true, message = "Passenger added successfully", passengerId = model.PasagjeriId });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdatePassenger([FromBody] PasagjeretViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _pasagjerService.UpdatePassenger(model);
        return Ok(new { success = true, message = "Passenger updated successfully" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeletePassenger(int id)
    {
        await _pasagjerService.DeletePassenger(id);
        return Ok(new { success = true, message = "Passenger deleted successfully" });
    }
}