﻿using ProjektZespolowy.API.Models.Work;
using ProjektZespolowy.API.Models.Work.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProjektZespolowy.API.Services
{
    public interface ITaskService
    {
        Task<Dictionary<string, Column>> GetKanbanTasks();
        Task<KanbanTask> GetKanbanTaskByIdAsync(int id);
        Task<KanbanTask> CreateKanbanTaskAsync(KanbanTask kanbanTask);
        Task<bool> EditKanbanTaskStatusAsync(List<KanbanTaskStatusSaveRequest> request);
        Task<bool> DeleteKanbanTaskByIdAsync(int id);
        Task<bool> EditKanbanTaskAsync(int id, UpdateKanbanTaskDto updateDto);
    }
}
