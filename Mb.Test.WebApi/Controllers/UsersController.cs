using Mb.Test.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mb.Test.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MbTestContext _dbContext;
        public UsersController(MbTestContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }

            return await _dbContext.Users.ToArrayAsync();
        }

        [HttpPost]
        public ActionResult Create(User user)
        {
            string message = "";
            if (user.UserType == UserType.Person)
            {
                var checkCardID = _dbContext.Users.Where(o => o.PersonCardID == user.PersonCardID).FirstOrDefault();
                if (checkCardID != null)
                {
                    message = "Your Card ID has already exist. Please change and re-submit.";
                }
            }
            else if (user.UserType == UserType.Company)
            {
                var checkCardID = _dbContext.Users.Where(o => o.CompanyTaxID == user.CompanyTaxID).FirstOrDefault();
                if (checkCardID != null)
                {
                    message = "Your Tax ID has already exist. Please change and re-submit.";
                }
            }

            if (!string.IsNullOrEmpty(message))
            {
                return new JsonResult(new { message, id = "" });
            }
            else
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();

                return new JsonResult(new { message = "", id = user.ID });
            }
        }
    }
}
