using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;


[ApiController]
[Route("api/[controller]")]
public class BiletatController(IRezervimService rezervimService, IBiletService biletService) : ControllerBase
{

    [HttpGet("list")]
    public async Task<IActionResult> GetAllTickets()
    {
        var tickets = await biletService.GetAllTickets();
        return tickets.Any() ? Ok(tickets) : NotFound(new { success = false, message = "No tickets found" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTicketById(int id)
    {
        var ticket = await biletService.GetTicketById(id);
        return ticket != null ? Ok(ticket) : NotFound(new { success = false, message = "Ticket not found" });
    }


    [HttpGet("selectForDropdown")]
    public async Task<IActionResult> SelectForRezervimDropdownAsync()
    {
        var rezervimet = await rezervimService.SelectForRezervimDropdownAsync();

        Console.WriteLine($"Buses: {JsonConvert.SerializeObject(rezervimet)}");

        return Ok(new { rezervimet });
    }


    //[HttpPost("add")]
    //public async Task<IActionResult> AddTicket([FromBody] BiletatViewModel model)
    //{
    //    if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

    //    await biletService.AddTicket(model);
    //    return Ok(new { success = true, message = "Ticket added successfully", ticketId = model.BiletaId });
    //}

    [HttpPost("add")]
    public async Task<IActionResult> AddTicket([FromBody] BiletatViewModel model)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(new { success = false, message = "Model validation failed", errors });
        }

        await biletService.AddTicket(model);
        return Ok(new { success = true, message = "Ticket added successfully" });
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateTicket([FromBody] BiletatViewModel model)
    {
        if (model == null) return BadRequest(new { success = false, message = "Invalid data provided" });

        await biletService.UpdateTicket(model);
        return Ok(new { success = true, message = "Ticket updated successfully" });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        await biletService.DeleteTicket(id);
        return Ok(new { success = true, message = "Ticket deleted successfully" });
    }
}