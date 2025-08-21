using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using BusMNG.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusMNG.Repositories.Interfaces;
using BusMNG.DTOs;

public class RezervimService : IRezervimService
{
    private readonly IRezervimRepository _rezervimRepository;

    public RezervimService(IRezervimRepository rezervimRepository)
    {
        _rezervimRepository = rezervimRepository;
    }

    public async Task<IEnumerable<RezervimetViewModel>> GetAllBookings()
    {
        var bookings = await _rezervimRepository.GetAllAsync();
        return bookings.Select(MapToViewModel);
    }

    public async Task<RezervimetViewModel> GetBookingById(int id)
    {
        var booking = await _rezervimRepository.GetByIdAsync(id);
        return booking != null ? MapToViewModel(booking) : null;
    }

    public async Task AddBooking(RezervimetViewModel rezervimetViewModel)
    {
        var booking = MapToModel(rezervimetViewModel);
        await _rezervimRepository.AddAsync(booking);
    }

    public async Task UpdateBooking(RezervimetViewModel rezervimetViewModel)
    {
        var booking = MapToModel(rezervimetViewModel);
        await _rezervimRepository.UpdateAsync(booking);
    }

    public async Task DeleteBooking(int id)
    {
        await _rezervimRepository.DeleteAsync(id);
    }


    public async Task<IEnumerable<RezervimDto>> SelectForRezervimDropdownAsync()
    {
        var rezervimet = await _rezervimRepository.GetAllAsync();
        return rezervimet.Select(r => new RezervimDto
        {
            RezervimiId = r.RezervimiId,
            RezervimiName = r.Statusi
        });
    }
    private RezervimetViewModel MapToViewModel(Rezervimet booking)
    {
        return new RezervimetViewModel
        {
            RezervimiId = booking.RezervimiId ?? 0,
            PasagjeriId = booking.PasagjeriId,
            OrariId = booking.OrariId,
            NumriVendit = booking.NumriVendit ?? 0,
            Statusi = booking.Statusi,
            DataKrijimit = booking.DataKrijimit,
            Biletats = booking.Biletats?.ToList() ?? new List<Biletat>(),
            Orari = booking.Orari,
            Pasagjeri = booking.Pasagjeri
        };
    }

    private Rezervimet MapToModel(RezervimetViewModel rezervimetViewModel)
    {
        return new Rezervimet
        {
            RezervimiId = rezervimetViewModel.RezervimiId,
            PasagjeriId = rezervimetViewModel.PasagjeriId,
            OrariId = rezervimetViewModel.OrariId,
            NumriVendit = rezervimetViewModel.NumriVendit,
            Statusi = rezervimetViewModel.Statusi,
            DataKrijimit = rezervimetViewModel.DataKrijimit,
            Biletats = rezervimetViewModel.Biletats?.ToList() ?? new List<Biletat>(),
            Orari = rezervimetViewModel.Orari,
            Pasagjeri = rezervimetViewModel.Pasagjeri
        };
    }
}