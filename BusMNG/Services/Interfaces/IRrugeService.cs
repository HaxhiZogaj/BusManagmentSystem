using BusMNG.DTOs;
using BusMNG.ViewModels;

namespace BusMNG.Services.Interfaces
{
    public interface IRrugeService
    {
        Task<IEnumerable<RrugetViewModel>> GetAllRoutes();
        Task<RrugetViewModel> GetRouteById(int id);
        Task AddRoute(RrugetViewModel rrugetViewModel);
        Task UpdateRoute(RrugetViewModel rrugetViewModel);
        Task DeleteRoute(int id);

        Task<IEnumerable<RrugaDto>> SelectForDropdownAsync();

    }
}
