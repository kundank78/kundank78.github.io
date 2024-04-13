---
title: TCP/IP
---

Published on December 23, 2020


The TCP/IP Model is a simpler, practical model that focuses on the core functions of network communication. 
It is often described as having either four or five layers, with the Network Access Layer being a combination of the OSI's Physical and Data Link Layers.

* Application Layer: Similar to the OSI model, this layer provides network services to applications.
* Transport Layer: This layer manages reliable (TCP) or unreliable (UDP) data transfer between applications.
* Internet Layer: Responsible for routing and addressing packets across networks using IP (Internet Protocol).
* Network Access Layer: Combines the functionalities of the OSI's Data Link and Physical Layers, encompassing 
  physical media transmission and network interface control.


------------------------------------------------------------------------
**Internet Protocol** functions within the Internet Layer (Layer 3) of the TCP/IP model, and here's a breakdown of its key aspects:

What is IP? --> IP is a set of rules that governs how data is addressed and routed across networks on the internet. 
It ensures that data packets, which are small pieces of information, travel from a source device to the correct destination device.

Key functionalities of IP:
- Addressing: IP assigns a unique identifier called an IP address to every device connected to the internet. This address helps route data packets to the specific device.
- Packet Encapsulation: IP takes data from upper layers and encapsulates it within a datagram structure. This datagram includes the source and destination IP addresses, along with other control information needed for routing.
- Routing: IP doesn't establish a direct connection between sender and receiver, Routers which are specialized devices, use the destination IP address in the packet header to determine the most efficient path for the packet to reach its destination.

IP itself is a connectionless protocol. This means it doesn't guarantee the order or error-free delivery of packets. 
Higher-level protocols like TCP can be used on top of IP to establish reliable connections and ensure data arrives correctly.

![IP.png](assets%2FIP.png)
![IPDiagram.png](assets%2FIPDiagram.png)

------------------------------------------------------------------------

**Transmission Control Protocol**, is a fundamental protocol within the Transport Layer of the TCP/IP model. It's responsible
for ensuring reliable and ordered delivery of data streams between applications running on different devices over a network.
- Connection-Oriented: TCP establishes a virtual connection between the sender and receiver before data transmission begins. 
  This three-way handshake ensures both parties are ready to communicate.
- Stream-Oriented: TCP treats data as a continuous stream of bytes. The application layer provides the data stream to TCP, which segments it into packets for network transmission.
- Sequencing: TCP assigns a sequence number to each packet it sends. This allows the receiver to reorder the packets if they arrive out of order due to network delays or retransmissions.
- Acknowledgement (ACK): After receiving a packet, the receiver sends an acknowledgement (ACK) message back to the sender.ddw
- Retransmission: If an ACK isn't received within a timeout period, the sender assumes the packet was lost and retransmits it.
- Flow Control: TCP regulates the data flow to prevent the receiver from being overwhelmed. It uses a windowing mechanism where the sender transmits data packets only up to a specific window size advertised by the receiver. This prevents buffer overflow at the receiver's end.
- Connection Termination: Once data transmission is complete, both sender and receiver initiate a four-way handshake to gracefully close the connection.

![TCP.png](assets%2FTCP.png)
![TCPFlow.png](assets%2FTCPFlow.png)

------------------------------------------------------------------------
User Datagram Protocol focuses on speed and efficiency, making it a suitable choice for different communication scenarios.
- Connectionless: Unlike TCP, UDP doesn't establish a connection between sender and receiver before transmitting data. It simply sends packets directly to the destination IP and port, without waiting for confirmation or acknowledgement. This makes UDP faster and less resource-intensive than TCP.
- Unreliable: Since UDP doesn't employ mechanisms like sequencing, acknowledgements, or retransmissions, it doesn't guarantee reliable delivery of data. Packets can be lost, arrive out of order, or even be duplicated during transmission.
- Speed: The lack of connection establishment and overhead procedures allows for quicker data transfer, especially beneficial for real-time applications.

Datagram-Oriented:  UDP transmits data in discrete units called datagrams, similar to IP. However, unlike TCP's streams, datagrams are independent and don't rely on order for interpretation.
![UDP.png](assets%2FUDP.png)

------------------------------------------------------------------------------------------------
Network Address Translation (NAT) resides on a network device, typically a router. It acts as an intermediary between your private network and the public internet. Functionalities:
- Private IP to Public IP Translation: When a device on your private network wants to access the internet, it initiates a communication request. NAT translates the device's private IP address to the router's public IP address before sending the data packets out to the internet. This allows your devices to appear as a single entity on the public internet, even though they have private addresses internally.
- Port Address Translation (PAT): A common NAT technique called Port Address Translation (PAT) allows multiple devices on a private network to share a single public IP address. NAT assigns a unique port number to each device's communication session. When a response from the internet arrives, NAT uses the destination port number to identify the specific device within the private network that originated the request.

![NAT.png](assets%2FNAT.png)