using BusMNG.DTOs;
using BusMNG.ViewModels;
using Syncfusion.EJ2.Schedule;

namespace BusMNG.Services.Interfaces
{
    public interface IOrarService
    {
        Task<IEnumerable<OraretViewModel>> GetAllSchedules();
        Task<OraretViewModel> GetScheduleById(int id);
        Task AddSchedule(OraretViewModel oraretviewmodel);
        Task UpdateSchedule(OraretViewModel oraretViewModel);
        Task DeleteSchedule(int id);

        Task<IEnumerable<BusDto>> SelectForBusDropdownAsync();

        Task<IEnumerable<RrugaDto>> SelectForRrugaDropdownAsync();
    }
}
