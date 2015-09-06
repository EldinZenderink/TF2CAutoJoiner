using System;
using System.Text;
using System.IO;
using System.Net;
using System.Threading;
using System.Net.WebSockets;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace TF2CAutoJoiner
{
    class Program
    {

        [DllImport("kernel32.dll")]
        static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        const int SW_HIDE = 0;
        const int SW_SHOW = 5;

        static WebSocket ws;
        static string webRoot = Directory.GetCurrentDirectory() + "\\webroot\\";

        static void Main(string[] args)
        {

            if (!File.Exists(webRoot + "autojoiner.html"))
            {
                webRoot = Directory.GetCurrentDirectory() + "\\";
                if(!File.Exists(webRoot + "autojoiner.html"))
                {
                    Console.WriteLine("Error: Could not find file:");
                    Console.WriteLine(webRoot + "autojoiner.html");
                    Console.WriteLine();
                    Console.WriteLine("Redownload/Reinstall this program, make sure autojoiner.html exist in either /webroot or the folder where I am located!");
                    Console.WriteLine();
                    Console.WriteLine("Press a key to exit....");
                    Console.ReadLine();
                    exit();

                }
                Console.WriteLine("no custom directory, using default :D");
            }
            // Run Chrome in app mode :D
            Process proc = Process.Start("chrome", @" --app=http://localhost:8080/autojoiner.html --window-size=1280,800");
            Console.WriteLine("listening");

            //websocket server thread
            Console.WriteLine("Starting http-> websocket listener and server");

            Thread socketserver = new Thread(() => WebSocketServer());
            socketserver.IsBackground = true;
            socketserver.Start();

            //http server thread
            Console.WriteLine("Starting http server now");

            Thread httpserver = new Thread(() => HttpWebServer());
            httpserver.IsBackground = true;
            httpserver.Start();

            //debugging
            //Thread inputWatcher = new Thread(() => getInput());
            //inputWatcher.Start();


            //receive lobbies every 2 secs
            Thread htmlRetreiver = new Thread(() => getLobbies("http://tf2center.com/lobbies"));
            htmlRetreiver.IsBackground = true;
            htmlRetreiver.Start();

            var handle = GetConsoleWindow();
            ShowWindow(handle, SW_HIDE);
            Console.ReadLine();

        }

        private static void exit()
        {
            Console.WriteLine("CHROME EXITED");
            Environment.Exit(0);
        }

        private static async void getInput()
        {
            while (true)
            {
                Console.WriteLine("SAY:");
                string input = Console.ReadLine();
                sendMessage(input);
            }
        }

        private static async void HttpWebServer()
        {
            HttpListener listener = new HttpListener();

            listener.Prefixes.Add("http://localhost:8080/");
            listener.Start();

            while (listener.IsListening)
            {
                HttpListenerContext context = listener.GetContext();
                HttpListenerRequest request = context.Request;
                HttpListenerResponse response = context.Response;

                string rawUrl = request.RawUrl;

                Console.WriteLine("CLIENT REQUESTED: " + rawUrl);

                string file = rawUrl.Substring(1);

                Console.WriteLine("FILE REQUESTED: " + file);

                try
                {
                    byte[] fileArray = File.ReadAllBytes(webRoot + file);

                    response.ContentLength64 = fileArray.Length;

                    Stream output = response.OutputStream;

                    output.Write(fileArray, 0, fileArray.Length);

                    Console.WriteLine("Succesfully send output to browser");

                    output.Close();
                }
                catch (Exception ex)
                {
                    response.StatusCode = 404;
                    response.StatusDescription = "File not found: " + file;
                    response.Close();
                    Console.WriteLine("FILE NOT FOUND: " + webRoot + file);

                }

                Thread.Sleep(1);
            }
        }

        private static async void WebSocketServer()
        {

            HttpListener listener = new HttpListener();

            listener.Prefixes.Add("http://localhost:3696/websocket/");
            listener.Start();
            bool wasOpen = false;

            while (listener.IsListening)
            {
                HttpListenerContext context = listener.GetContext();
                HttpListenerRequest request = context.Request;

                if (request.IsWebSocketRequest)
                {
                    WebSocketContext webCont = await context.AcceptWebSocketAsync(subProtocol: null);
                    ws = webCont.WebSocket;

                    byte[] receivebytes = new byte[1024];

                    while (ws.State == WebSocketState.Open)
                    {

                        WebSocketReceiveResult rcRes = await ws.ReceiveAsync(new ArraySegment<byte>(receivebytes), CancellationToken.None);
                        string receivedString = Encoding.UTF8.GetString(receivebytes, 0, rcRes.Count);
                        Console.WriteLine("RECEIVED: " + receivedString);
                        wasOpen = true;
                        Thread.Sleep(1);
                    }

                    if (ws.State != WebSocketState.Open && wasOpen)
                    {
                        Console.WriteLine("Websocket closed");
                        exit();
                        break;
                    }

                }
                Thread.Sleep(1);
            }

        }

        private static async void getLobbies(string url)
        {

            string oldLobbies = "";
            while (url != "")
            {
                try
                {
                    using (WebClient client = new WebClient()) // WebClient class inherits IDisposable
                    {
                        // Or you can get the file content without saving it:
                        string htmlCode = client.DownloadString(url);

                        string lobbiesInitiator = htmlCode.Substring(htmlCode.IndexOf("replaceAllLobbies"));

                        string lobbies = lobbiesInitiator.Substring(0, lobbiesInitiator.IndexOf("</script>"));
                        if (oldLobbies != lobbies)
                        {
                            Console.WriteLine("change detected");
                            sendMessage(lobbies);
                            oldLobbies = lobbies;
                        }
                        else
                        {
                            Console.WriteLine("no change");
                        }
                    }

                }
                catch (Exception E)
                {
                    Console.WriteLine("Could Not Parse Lobbies");
                    if (E.ToString().Contains("503") || E.ToString().Contains("404"))
                    {
                        Console.WriteLine("Website is ofline!");
                        sendMessage("503/404");
                    }
                }

                Thread.Sleep(1500);
            }
        }

        private static async void sendMessage(string input)
        {
            try
            {
                if (ws.State == WebSocketState.Open)
                {
                    byte[] sendBytes = Encoding.UTF8.GetBytes(input);
                    await ws.SendAsync(new ArraySegment<byte>(sendBytes), WebSocketMessageType.Text, true, CancellationToken.None);
                    Console.WriteLine("Message send");
                }
                else
                {
                    Console.WriteLine("WEBSOCKET NOT OPEN");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("WEBSOCKET NOT CREATED");
            }

        }

    }
}
