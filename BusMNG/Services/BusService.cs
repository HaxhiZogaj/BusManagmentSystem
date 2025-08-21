using BusMNG.DTOs;
using BusMNG.Models;
using BusMNG.Repositories.Interfaces;
using BusMNG.Services.Interfaces;
using BusMNG.ViewModels;

namespace BusMNG.Services
{
    public class BusService : IBusService
    {
        private readonly IBusRepository _busRepository;

        public BusService(IBusRepository busRepository)
        {
            _busRepository = busRepository;
        }

        public async Task<IEnumerable<BusViewModel>> GetAllBuses()
        {
            var buses = await _busRepository.GetAllAsync();
            return buses.Select(bus => MapToViewModel(bus));
        }

        public async Task<BusViewModel> GetBusById(int id)
        {
            var bus = await _busRepository.GetByIdAsync(id);
            return bus != null ? MapToViewModel(bus) : null;
        }

        public async Task AddBus(BusViewModel busVM)
        {
            var bus = MapToModel(busVM);
            await _busRepository.AddAsync(bus);
        }

        public async Task UpdateBus(BusViewModel busVM)
        {
            var bus = MapToModel(busVM);
            await _busRepository.UpdateAsync(bus);
        }

        public async Task DeleteBus(int id)
        {
            await _busRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<BusDto>> SelectForDropdownAsync()
        {
            var buses = await _busRepository.GetAllAsync();
            return buses.Select(b => new BusDto
            {
                BusId = b.BusId,
                BusName = b.NumriTargës
            });
        }

        private BusViewModel MapToViewModel(Bus bus)
        {
            return new BusViewModel
            {
                BusId = bus.BusId ?? 0,
                NumriTargës = bus.NumriTargës,
                Kapaciteti = bus.Kapaciteti,
                Statusi = bus.Statusi
            };
        }

        private Bus MapToModel(BusViewModel busVM)
        {
            return new Bus
            {
                BusId = busVM.BusId,
                NumriTargës = busVM.NumriTargës,
                Kapaciteti = busVM.Kapaciteti,
                Statusi = busVM.Statusi
            };
        }
    }
}
