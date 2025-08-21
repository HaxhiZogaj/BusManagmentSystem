using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using BusMNG.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusMNG.Repositories.Interfaces;
using BusMNG.DTOs;
using BusMNG.Repositories;

public class PasagjerService : IPasagjerService
{
    private readonly IPasagjerRepository _pasagjerRepository;

    public PasagjerService(IPasagjerRepository pasagjerRepository)
    {
        _pasagjerRepository = pasagjerRepository;
    }

    public async Task<IEnumerable<PasagjeretViewModel>> GetAllPassengers()
    {
        var passengers = await _pasagjerRepository.GetAllAsync();
        return passengers.Select(MapToViewModel);
    }

    public async Task<PasagjeretViewModel> GetPassengerById(int id)
    {
        var passenger = await _pasagjerRepository.GetByIdAsync(id);
        return passenger != null ? MapToViewModel(passenger) : null;
    }

    public async Task AddPassenger(PasagjeretViewModel pasagjeretViewModel)
    {
        var passenger = MapToModel(pasagjeretViewModel);
        await _pasagjerRepository.AddAsync(passenger);
    }

    public async Task UpdatePassenger(PasagjeretViewModel pasagjeretViewModel)
    {
        var passenger = MapToModel(pasagjeretViewModel);
        await _pasagjerRepository.UpdateAsync(passenger);
    }

    public async Task DeletePassenger(int id)
    {
        await _pasagjerRepository.DeleteAsync(id);
    }


    public async Task<IEnumerable<PasagjerDto>> SelectForDropdownAsync()
    {
        var pasagjeret = await _pasagjerRepository.GetAllAsync();
        return pasagjeret.Select(p => new PasagjerDto
        {
            PasagjeriId = p.PasagjeriId,
            PasagjeriName = p.Emri
        });
    }
    private PasagjeretViewModel MapToViewModel(Pasagjerët passenger)
    {
        return new PasagjeretViewModel
        {
            PasagjeriId = passenger.PasagjeriId,
            Emri = passenger.Emri,
            Email = passenger.Email,
            NumriTelefonit = passenger.NumriTelefonit,
            DataKrijimit = passenger.DataKrijimit,
            Rezervimets = passenger.Rezervimets?.ToList() ?? new List<Rezervimet>()
        };
    }

    private Pasagjerët MapToModel(PasagjeretViewModel pasagjeretViewModel)
    {
        return new Pasagjerët
        {
            PasagjeriId = pasagjeretViewModel.PasagjeriId,
            Emri = pasagjeretViewModel.Emri,
            Email = pasagjeretViewModel.Email,
            NumriTelefonit = pasagjeretViewModel.NumriTelefonit,
            DataKrijimit = pasagjeretViewModel.DataKrijimit,
            Rezervimets = pasagjeretViewModel.Rezervimets?.ToList() ?? new List<Rezervimet>()
        };
    }
}