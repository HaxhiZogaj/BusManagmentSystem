using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class OraretController : ControllerBase
{
    private readonly IOrarService _orarService;

    public OraretController(IOrarService orarService)
    {
        _orarService = orarService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllSchedules()
    {
        var schedules = await _orarService.GetAllSchedules();
        return schedules.Any() ? Ok(schedules) : NotFound(new { success = false, message = "No schedules found" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetScheduleById(int id)
    {
        var schedule = await _orarService.GetScheduleById(id);
        return schedule != null ? Ok(schedule) : NotFound(new { success = false, message = "Schedule not found" });
    }

    //[HttpGet("selectForDropdown")]
    //public async Task<IActionResult> SelectForDropdownAsync()
    //{
    //    var oraret = await _orarService.SelectForDropdownAsync();
    //    return Ok(oraret);
    //}]

    [HttpGet("selectForDropdown")]
    public async Task<IActionResult> SelectForDropdownAsync()
    {
        var buses = await _orarService.SelectForBusDropdownAsync();
        var rruget = await _orarService.SelectForRrugaDropdownAsync();

        Console.WriteLine($"Buses: {JsonConvert.SerializeObject(buses)}");
        Console.WriteLine($"Rruget: {JsonConvert.SerializeObject(rruget)}");

        return Ok(new { buses, rruget });
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddSchedule([FromBody] OraretViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _orarService.AddSchedule(model);
        return Ok(new { success = true, message = "Schedule added successfully", scheduleId = model.OrariId });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateSchedule([FromBody] OraretViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _orarService.UpdateSchedule(model);
        return Ok(new { success = true, message = "Schedule updated successfully" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteSchedule(int id)
    {
        await _orarService.DeleteSchedule(id);
        return Ok(new { success = true, message = "Schedule deleted successfully" });
    }
}