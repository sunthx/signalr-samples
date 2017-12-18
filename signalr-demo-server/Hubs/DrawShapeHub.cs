using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;

namespace signalr_demo_server
{
    public class DrawShapeHub : Hub
    {
        public void Draw(DataModel data)
        {
            data.ClientId = Context.ConnectionId;
            Clients.AllExcept(new List<string> { data.ClientId }).InvokeAsync("draw", data);
        }
    }
}