using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using BusMNG.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusMNG.Repositories.Interfaces;
using BusMNG.DTOs;
using BusMNG.Repositories;

public class BiletService(IRezervimRepository rezervimRepository,IBiletRepository biletRepository) : IBiletService
{


    public async Task<IEnumerable<BiletatViewModel>> GetAllTickets()
    {
        var tickets = await biletRepository.GetAllAsync();
        return tickets.Select(MapToViewModel);
    }


    public async Task<BiletatViewModel> GetTicketById(int id)
    {
        var ticket = await biletRepository.GetByIdAsync(id);
        return ticket != null ? MapToViewModel(ticket) : null;
    }

    public async Task AddTicket(BiletatViewModel biletatViewModel)
    {
        var ticket = MapToModel(biletatViewModel);
        await biletRepository.AddAsync(ticket);
    }

    public async Task UpdateTicket(BiletatViewModel biletatViewModel)
    {
        var ticket = MapToModel(biletatViewModel);
        await biletRepository.UpdateAsync(ticket);
    }

    public async Task DeleteTicket(int id)
    {
        await biletRepository.DeleteAsync(id);
    }


    //public async Task<IEnumerable<BiletDto>> SelectForDropdownAsync()
    //{
    //    var tickets = await biletRepository.GetAllAsync();
    //    return tickets.Select(b => new BiletDto
    //    {
    //        BiletId = b.BiletaId ?? 0,
    //        BiletName = b.NumriBiletës 
    //    });
    //}

    public async Task<IEnumerable<RezervimDto>> SelectForRezervimDropdownAsync()
    {
        var rezervimet = await rezervimRepository.GetAllAsync();
        return rezervimet.Select(r => new RezervimDto
        {
            RezervimiId = r.RezervimiId,
            RezervimiName = r.Statusi
        });
    }


    private BiletatViewModel MapToViewModel(Biletat ticket)
    {
        return new BiletatViewModel
        {
            BiletaId = ticket.BiletaId ?? 0,
            RezervimiId = ticket.RezervimiId ?? 0,
            NumriBiletës = ticket.NumriBiletës,
            Çmimi = ticket.Çmimi,
            DataLëshimit = ticket.DataLëshimit,
            Rezervimi = ticket.Rezervimi
        };
    }

    private Biletat MapToModel(BiletatViewModel biletatViewModel)
    {
        return new Biletat
        {
            BiletaId = biletatViewModel.BiletaId,
            RezervimiId = biletatViewModel.RezervimiId,
            NumriBiletës = biletatViewModel.NumriBiletës,
            Çmimi = biletatViewModel.Çmimi,
            DataLëshimit = biletatViewModel.DataLëshimit,
            Rezervimi = biletatViewModel.Rezervimi
        };
    }
}