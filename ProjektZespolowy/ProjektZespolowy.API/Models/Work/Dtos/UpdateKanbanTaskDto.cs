namespace ProjektZespolowy.API.Models.Work.Dtos
{
    public class UpdateKanbanTaskDto
    {
        public string Title { get; set; }
        public string Summary { get; set; }
        public DateTime? DueDate { get; set; }
    }
}
