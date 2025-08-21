using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


[ApiController]
[Route("api/[controller]")]
public class ShoferetController : ControllerBase
{
    private readonly IShoferService _shoferService;

    public ShoferetController(IShoferService shoferService)
    {
        _shoferService = shoferService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllDrivers()
    {
        var drivers = await _shoferService.GetAllDrivers();
        return drivers.Any() ? Ok(drivers) : NotFound(new { success = false, message = "No drivers found" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetDriverById(int id)
    {
        var driver = await _shoferService.GetDriverById(id);
        return driver != null ? Ok(driver) : NotFound(new { success = false, message = "Driver not found" });
    }

    [HttpGet("selectForDropdown")]
    public async Task<IActionResult> SelectForDropdownAsync()
    {
        var shoferet = await _shoferService.SelectForDropdownAsync();
        return Ok(shoferet);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddDriver([FromBody] ShoferetViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _shoferService.AddDriver(model);
        return Ok(new { success = true, message = "Driver added successfully", driverId = model.ShoferiId });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateDriver([FromBody] ShoferetViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _shoferService.UpdateDriver(model);
        return Ok(new { success = true, message = "Driver updated successfully" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteDriver(int id)
    {
        await _shoferService.DeleteDriver(id);
        return Ok(new { success = true, message = "Driver deleted successfully" });
    }
}