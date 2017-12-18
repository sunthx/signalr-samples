using Newtonsoft.Json;

namespace signalr_demo_server
{
    public class MoveData{
        
        [JsonIgnore]
        public string ClientId { set; get; }

        [JsonProperty("x")]
        public double X { get; set; }

        [JsonProperty("y")]
        public double Y { get; set; }

    }
}