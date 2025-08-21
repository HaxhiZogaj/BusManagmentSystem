using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;


[ApiController]
[Route("api/[controller]")]
public class RrugetController : ControllerBase
{
    private readonly IRrugeService _rrugeService;

    public RrugetController(IRrugeService rrugeService)
    {
        _rrugeService = rrugeService;
    }

    [HttpGet("list")]
    public async Task<IActionResult> GetAllRoutes()
    {
        var routes = await _rrugeService.GetAllRoutes();
        return routes.Any() ? Ok(routes) : NotFound(new { success = false, message = "No routes found" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetRouteById(int id)
    {
        var route = await _rrugeService.GetRouteById(id);
        return route != null ? Ok(route) : NotFound(new { success = false, message = "Route not found" });
    }

    [HttpGet("selectForDropdown")]
    public async Task<IActionResult> SelectForDropdownAsync()
    {
        var rruget = await _rrugeService.SelectForDropdownAsync();
        return Ok(rruget);
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddRoute([FromBody] RrugetViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _rrugeService.AddRoute(model);
        return Ok(new { success = true, message = "Route added successfully", routeId = model.RrugaId });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateRoute([FromBody] RrugetViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await _rrugeService.UpdateRoute(model);
        return Ok(new { success = true, message = "Route updated successfully" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteRoute(int id)
    {
        await _rrugeService.DeleteRoute(id);
        return Ok(new { success = true, message = "Route deleted successfully" });
    }
}