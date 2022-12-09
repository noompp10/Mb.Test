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
            //if (string.IsNullOrEmpty(user.Address)
            //    || string.IsNullOrEmpty(user.Email)
            //    || string.IsNullOrEmpty(user.Name)
            //    || string.IsNullOrEmpty(user.Surname)
            //    || string.IsNullOrEmpty(user.Telephone)
            //    || string.IsNullOrEmpty(user.Address))
            //{
            //    return "Enter required fields";
            //}

            //if ((int)user.UserType < 1 && (int)user.UserType > 2)
            //{
            //    return "Enter required User Type";
            //}

            //if (user.UserType == UserType.Person)
            //{
            //    if (user.PersonDOB == null
            //        || string.IsNullOrEmpty(user.PersonCardID))
            //    {
            //        return "Enter required fields for Person";
            //    }
            //}
            //else if (user.UserType == UserType.Company)
            //{
            //    if (string.IsNullOrEmpty(user.CompanyContactPerson)
            //        || string.IsNullOrEmpty(user.CompanyTaxID))
            //    {
            //        return "Enter required fields for Company";
            //    }
            //}

            //if (user.UserType == UserType.Person)
            //{
            //    var checkCardID = _dbContext.Users.Where(o => o.PersonCardID == user.PersonCardID).FirstOrDefault();
            //    if (checkCardID != null)
            //    {
            //        return "Your Card ID already has been registered on our system";
            //    }
            //}


            //if (user.UserType == UserType.Company)
            //{
            //    var checkCardID = _dbContext.Users.Where(o => o.CompanyTaxID == user.CompanyTaxID).FirstOrDefault();
            //    if (checkCardID != null)
            //    {
            //        return "Your TAX ID already has been registered on our system";
            //    }
            //}



            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return new JsonResult(new { message = "ok", id = user.ID });
        }
    }
}
