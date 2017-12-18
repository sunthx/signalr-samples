using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace signalr_demo_server.Controllers
{
    [Route("api/message")]
    public class MessageController : Controller
    {
        IHubContext<MessageHub> _hubConnectionContext;
        public MessageController(IHubContext<MessageHub> context)
        {
            _hubConnectionContext = context;
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post()
        {
            _hubConnectionContext.Clients.All.InvokeAsync("send", "Hello from the server");
            return Ok();
        }

    }
}
