using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using BusMNG.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusMNG.Repositories.Interfaces;
using BusMNG.DTOs;
using BusMNG.Repositories;

public class OrarService(IBusRepository busRepository, IRrugeRepository rrugeRepository,IOrarRepository orarRepository) : IOrarService
{

    public async Task<IEnumerable<OraretViewModel>> GetAllSchedules()
    {
        var schedules = await orarRepository.GetAllAsync();
        return schedules.Select(MapToViewModel);
    }


    public async Task<OraretViewModel> GetScheduleById(int id)
    {
        var schedule = await orarRepository.GetByIdAsync(id);
        return schedule != null ? MapToViewModel(schedule) : null;
    }

    public async Task AddSchedule(OraretViewModel orarViewModel)
    {
        var schedule = MapToModel(orarViewModel);
        await orarRepository.AddAsync(schedule);
    }

    public async Task UpdateSchedule(OraretViewModel orarViewModel)
    {
        var schedule = MapToModel(orarViewModel);
        await orarRepository.UpdateAsync(schedule);
    }

    public async Task DeleteSchedule(int id)
    {
        await orarRepository.DeleteAsync(id);
    }


    public async Task<IEnumerable<BusDto>> SelectForBusDropdownAsync()
    {
        var buses = await busRepository.GetAllAsync();
        return buses.Select(b => new BusDto
        {
            BusId = b.BusId ?? 0,
            BusName = b.NumriTargës
        }).ToList();
    }

    public async Task<IEnumerable<RrugaDto>> SelectForRrugaDropdownAsync()
    {
        var rruget = await rrugeRepository.GetAllAsync();
        return rruget.Select(r => new RrugaDto
        {
            RrugaId = r.RrugaId ?? 0,
            RrugaName = r.Origjina
        }).ToList();
    }

    private OraretViewModel MapToViewModel(Oraret schedule)
    {
        return new OraretViewModel
        {
            OrariId = schedule.OrariId ?? 0,
            BusId = schedule.BusId,
            RrugaId = schedule.RrugaId,
            KohaNisjes = schedule.KohaNisjes,
            KohaArritjes = schedule.KohaArritjes,
            Statusi = schedule.Statusi,
            DataKrijimit = schedule.DataKrijimit,
            Bus = schedule.Bus,
            Rezervimets = schedule.Rezervimets?.ToList() ?? new List<Rezervimet>(),
            Rruga = schedule.Rruga
        };
    }

    private Oraret MapToModel(OraretViewModel orarViewModel)
    {
        return new Oraret
        {
            OrariId = orarViewModel.OrariId,
            BusId = orarViewModel.BusId,
            RrugaId = orarViewModel.RrugaId,
            KohaNisjes = orarViewModel.KohaNisjes,
            KohaArritjes = orarViewModel.KohaArritjes,
            Statusi = orarViewModel.Statusi,
            DataKrijimit = orarViewModel.DataKrijimit,
            Bus = orarViewModel.Bus,
            Rezervimets = orarViewModel.Rezervimets?.ToList() ?? new List<Rezervimet>(),
            Rruga = orarViewModel.Rruga
        };
    }
}