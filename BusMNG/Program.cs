using BusMNG.Models;
using BusMNG.Services.Interfaces;
using BusMNG.Services;
using Microsoft.EntityFrameworkCore;
using BusMNG.Repositories.Interfaces;
using BusMNG.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddDbContext<BusKosovaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BusDbConnection")));


builder.Services.AddScoped<IPasagjerService, PasagjerService>();
builder.Services.AddScoped<IRezervimService, RezervimService>();
builder.Services.AddScoped<IOrarService, OrarService>();
builder.Services.AddScoped<IRrugeService, RrugeService>();
builder.Services.AddScoped<IShoferService, ShoferService>();
builder.Services.AddScoped<IBusService, BusService>();
builder.Services.AddScoped<IBiletService, BiletService>();


builder.Services.AddScoped<IPasagjerRepository, PasagjerRepository>();
builder.Services.AddScoped<IRezervimRepository, RezervimRepository>();
builder.Services.AddScoped<IOrarRepository, OrarRepository>();
builder.Services.AddScoped<IRrugeRepository, RrugeRepository>();
builder.Services.AddScoped<IShoferRepository, ShoferRepository>();
builder.Services.AddScoped<IBusRepository, BusRepository>();
builder.Services.AddScoped<IBiletRepository, BiletRepository>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173") // ✅ Match frontend URL
                   .AllowAnyHeader() // ✅ Allow all headers
                   .AllowAnyMethod() // ✅ Allow all HTTP methods
                   .AllowCredentials(); // ✅ This MUST be included
        });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
