import subprocess
import os
import threading

# Function to run npm start in the client directory
def run_client():
    client_path = '/path/to/your/client'  # Replace with your client path
    os.chdir(client_path)
    print(f"Running npm start in client path: {client_path}")
    subprocess.run(['npm', 'start'])

# Function to run node server.js in the server directory
def run_server():
    server_path = '/path/to/your/server'  # Replace with your server path
    os.chdir(server_path)
    print(f"Running node server.js in server path: {server_path}")
    subprocess.run(['node', 'server.js'])

if __name__ == "__main__":
    # Create two threads to run client and server simultaneously
    client_thread = threading.Thread(target=run_client)
    server_thread = threading.Thread(target=run_server)

    # Start both threads
    client_thread.start()
    server_thread.start()

    # Wait for both threads to finish
    client_thread.join()
    server_thread.join()

    print("Client and server are running.")
