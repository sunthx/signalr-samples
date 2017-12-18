using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;

namespace signalr_demo_server
{
    public class MoveHub : Hub{
        public void Move(MoveData data)
        {
            data.ClientId = Context.ConnectionId;
            Clients.AllExcept(new List<string> { data.ClientId }).InvokeAsync("move", data);
        }
    }
}