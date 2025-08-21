using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using BusMNG.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusMNG.Repositories.Interfaces;
using BusMNG.DTOs;

public class ShoferService : IShoferService
{
    private readonly IShoferRepository _shoferRepository;

    public ShoferService(IShoferRepository shoferRepository)
    {
        _shoferRepository = shoferRepository;
    }

    public async Task<IEnumerable<ShoferetViewModel>> GetAllDrivers()
    {
        var drivers = await _shoferRepository.GetAllAsync();
        return drivers.Select(MapToViewModel);
    }

    public async Task<ShoferetViewModel> GetDriverById(int id)
    {
        var driver = await _shoferRepository.GetByIdAsync(id);
        return driver != null ? MapToViewModel(driver) : null;
    }

    public async Task AddDriver(ShoferetViewModel shoferetViewModel)
    {
        var driver = MapToModel(shoferetViewModel);
        await _shoferRepository.AddAsync(driver);
    }

    public async Task UpdateDriver(ShoferetViewModel shoferetViewModel)
    {
        var driver = MapToModel(shoferetViewModel);
        await _shoferRepository.UpdateAsync(driver);
    }

    public async Task DeleteDriver(int id)
    {
        await _shoferRepository.DeleteAsync(id);
    }


    public async Task<IEnumerable<ShoferDto>> SelectForDropdownAsync()
    {
        var shoferet = await _shoferRepository.GetAllAsync();
        return shoferet.Select(s => new ShoferDto
        {
            ShoferiId = s.ShoferiId,
            ShoferName = s.Emri
        });
    }
    private ShoferetViewModel MapToViewModel(Shoferët driver)
    {
        return new ShoferetViewModel
        {
            ShoferiId = driver.ShoferiId,
            Emri = driver.Emri,
            NumriLicencës = driver.NumriLicencës,
            BusId = driver.BusId,
            DataKrijimit = driver.DataKrijimit,
            Bus = driver.Bus
        };
    }

    private Shoferët MapToModel(ShoferetViewModel shoferetViewModel)
    {
        return new Shoferët
        {
            ShoferiId = shoferetViewModel.ShoferiId,
            Emri = shoferetViewModel.Emri,
            NumriLicencës = shoferetViewModel.NumriLicencës,
            BusId = shoferetViewModel.BusId,
            DataKrijimit = shoferetViewModel.DataKrijimit,
            Bus = shoferetViewModel.Bus
        };
    }
}