using ProjektZespolowy.API.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ProjektZespolowy.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserController(SignInManager<ApplicationUser> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpGet("info")]
        public IActionResult GetInfo()
        {
            var user = HttpContext.User;

            if (user.Identity != null && user.Identity.IsAuthenticated)
            {
                var emailClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
                var nameIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

                return Ok(new
                {
                    Id = nameIdClaim?.Value,
                    Email = emailClaim?.Value
                });
            }

            return Unauthorized();
        }

        [HttpPost("logout")]
        public ActionResult LogOff()
        {
            _signInManager.SignOutAsync();

            return Ok();
        }
    }
}
