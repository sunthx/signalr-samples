using Newtonsoft.Json;

namespace signalr_demo_server
{
    public class DataModel
    {
        [JsonIgnore]
        public string ClientId { set; get; }
        [JsonProperty("x")]
        public double X { set; get; }
        [JsonProperty("y")]
        public double Y { set; get; }
        [JsonProperty("color")]
        public string Color { set; get; }
    }
}