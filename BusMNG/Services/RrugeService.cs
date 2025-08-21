using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;
using BusMNG.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusMNG.Repositories.Interfaces;
using BusMNG.DTOs;
using BusMNG.Repositories;

public class RrugeService : IRrugeService
{
    private readonly IRrugeRepository _rrugeRepository;

    public RrugeService(IRrugeRepository rrugeRepository)
    {
        _rrugeRepository = rrugeRepository;
    }

    public async Task<IEnumerable<RrugetViewModel>> GetAllRoutes()
    {
        var routes = await _rrugeRepository.GetAllAsync();
        return routes.Select(MapToViewModel);
    }

    public async Task<RrugetViewModel> GetRouteById(int id)
    {
        var route = await _rrugeRepository.GetByIdAsync(id);
        return route != null ? MapToViewModel(route) : null;
    }

    public async Task AddRoute(RrugetViewModel rrugetViewModel)
    {
        var route = MapToModel(rrugetViewModel);
        await _rrugeRepository.AddAsync(route);
    }

    public async Task UpdateRoute(RrugetViewModel rrugetViewModel)
    {
        var route = MapToModel(rrugetViewModel);
        await _rrugeRepository.UpdateAsync(route);
    }

    public async Task DeleteRoute(int id)
    {
        await _rrugeRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<RrugaDto>> SelectForDropdownAsync()
    {
        var rruget = await _rrugeRepository.GetAllAsync();
        return rruget.Select(r => new RrugaDto
        {
            RrugaId = r.RrugaId,
            RrugaName = $"{r.Origjina} - {r.Destinacioni}" // 🔥 Formatting for better readability
        });
    }
    private RrugetViewModel MapToViewModel(Rrugët route)
    {
        return new RrugetViewModel
        {
            RrugaId = route.RrugaId ?? 0,
            Origjina = route.Origjina,
            Destinacioni = route.Destinacioni,
            Distanca = route.Distanca,
            DataKrijimit = route.DataKrijimit,
            Orarets = route.Orarets?.ToList() ?? new List<Oraret>()
        };
    }

    private Rrugët MapToModel(RrugetViewModel rrugetViewModel)
    {
        return new Rrugët
        {
            RrugaId = rrugetViewModel.RrugaId,
            Origjina = rrugetViewModel.Origjina,
            Destinacioni = rrugetViewModel.Destinacioni,
            Distanca = rrugetViewModel.Distanca,
            DataKrijimit = rrugetViewModel.DataKrijimit,
            Orarets = rrugetViewModel.Orarets?.ToList() ?? new List<Oraret>()
        };
    }
}