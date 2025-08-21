using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class BusController : ControllerBase
{
    private readonly IBusService _busService;

    public BusController(IBusService busService)
    {
        _busService = busService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllBuses()
    {
        var buses = await _busService.GetAllBuses();
        return buses.Any() ? Ok(buses) : NotFound(new { success = false, message = "No buses found" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBusById(int id)
    {
        var bus = await _busService.GetBusById(id);
        return bus != null ? Ok(bus) : NotFound(new { success = false, message = "Bus not found" });
    }


    [HttpGet("selectForDropdown")]
    public async Task<IActionResult> SelectForDropdownAsync()
    {
        var bus = await _busService.SelectForDropdownAsync();
        return Ok(bus);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddBus([FromBody] BusViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _busService.AddBus(model);
        return Ok(new { success = true, message = "Bus added successfully", busId = model.BusId });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateBus([FromBody] BusViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _busService.UpdateBus(model);
        return Ok(new { success = true, message = "Bus updated successfully" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteBus(int id)
    {
        await _busService.DeleteBus(id);
        return Ok(new { success = true, message = "Bus deleted successfully" });
    }
}