import type { Command } from "../types";

let cmdCounter = 0;
const c = (command: string, description: string, category: string): Command => ({
  id: `cmd-${++cmdCounter}`,
  command,
  description,
  category,
});

export const allCommands: Command[] = [
  // Basic device management
  c("enable", "Enter privileged EXEC mode", "Basic Navigation"),
  c("configure terminal", "Enter global configuration mode", "Basic Navigation"),
  c("hostname <name>", "Set the device hostname", "Basic Navigation"),
  c("end", "Return to privileged EXEC mode", "Basic Navigation"),
  c("exit", "Move up one configuration level", "Basic Navigation"),
  c("write memory", "Save the running configuration", "Basic Navigation"),
  c("copy running-config startup-config", "Save running config to NVRAM", "Basic Navigation"),
  c("show running-config", "Display the active configuration", "Basic Navigation"),
  c("show startup-config", "Display the saved configuration", "Basic Navigation"),
  c("reload", "Restart the device", "Basic Navigation"),
  c("no shutdown", "Enable an interface", "Basic Navigation"),
  c("shutdown", "Disable an interface", "Basic Navigation"),

  // Interfaces
  c("interface <type><number>", "Enter interface configuration mode", "Interfaces"),
  c("ip address <ip> <mask>", "Assign an IPv4 address to an interface", "Interfaces"),
  c("ipv6 address <address>/<prefix>", "Assign an IPv6 address to an interface", "Interfaces"),
  c("description <text>", "Add a description to an interface", "Interfaces"),
  c("show ip interface brief", "Summarize interface status and IP addresses", "Interfaces"),
  c("show interfaces", "Display detailed interface statistics", "Interfaces"),
  c("show interfaces status", "Show switchport status summary", "Interfaces"),
  c("duplex <full|half|auto>", "Set interface duplex mode", "Interfaces"),
  c("speed <10|100|1000|auto>", "Set interface speed", "Interfaces"),

  // VLANs & Switching
  c("vlan <id>", "Create or edit a VLAN", "Switching"),
  c("name <vlan-name>", "Assign a name to a VLAN", "Switching"),
  c("switchport mode access", "Set a port to access mode", "Switching"),
  c("switchport access vlan <id>", "Assign an access port to a VLAN", "Switching"),
  c("switchport mode trunk", "Set a port to trunk mode", "Switching"),
  c("switchport trunk allowed vlan <list>", "Restrict VLANs allowed on a trunk", "Switching"),
  c("switchport trunk native vlan <id>", "Set the native VLAN on a trunk", "Switching"),
  c("show vlan brief", "Display VLAN-to-port assignments", "Switching"),
  c("show interfaces trunk", "Display trunk port status", "Switching"),
  c("channel-group <n> mode active", "Add a port to an LACP EtherChannel", "Switching"),
  c("show etherchannel summary", "Display EtherChannel status", "Switching"),

  // STP
  c("spanning-tree mode rapid-pvst", "Enable Rapid PVST+", "Spanning Tree"),
  c("spanning-tree vlan <id> priority <value>", "Set bridge priority for a VLAN", "Spanning Tree"),
  c("spanning-tree portfast", "Enable PortFast on an access port", "Spanning Tree"),
  c("spanning-tree bpduguard enable", "Enable BPDU Guard on a port", "Spanning Tree"),
  c("show spanning-tree", "Display spanning tree status", "Spanning Tree"),
  c("show spanning-tree vlan <id>", "Display STP status for a specific VLAN", "Spanning Tree"),

  // Routing
  c("ip route <network> <mask> <next-hop>", "Configure a static IPv4 route", "Routing"),
  c("ipv6 route <prefix>/<len> <next-hop>", "Configure a static IPv6 route", "Routing"),
  c("ip route 0.0.0.0 0.0.0.0 <next-hop>", "Configure a default route", "Routing"),
  c("show ip route", "Display the IPv4 routing table", "Routing"),
  c("show ipv6 route", "Display the IPv6 routing table", "Routing"),
  c("router ospf <process-id>", "Enable OSPF and enter router config mode", "Routing"),
  c("network <address> <wildcard> area <id>", "Advertise a network into OSPF", "Routing"),
  c("router-id <id>", "Manually set the OSPF router ID", "Routing"),
  c("passive-interface <type><number>", "Suppress OSPF hellos on an interface", "Routing"),
  c("show ip ospf neighbor", "Display OSPF neighbor adjacencies", "Routing"),
  c("show ip protocols", "Display active routing protocol settings", "Routing"),

  // IP Services
  c("ip dhcp pool <name>", "Create a DHCP address pool", "IP Services"),
  c("network <address> <mask>", "Define the DHCP pool's network", "IP Services"),
  c("default-router <ip>", "Set the DHCP default gateway option", "IP Services"),
  c("ip dhcp excluded-address <start> <end>", "Exclude addresses from a DHCP pool", "IP Services"),
  c("ip nat inside", "Mark an interface as NAT inside", "IP Services"),
  c("ip nat outside", "Mark an interface as NAT outside", "IP Services"),
  c("ip nat inside source list <acl> interface <if> overload", "Configure PAT (NAT overload)", "IP Services"),
  c("show ip nat translations", "Display active NAT translations", "IP Services"),
  c("ntp server <ip>", "Configure an NTP time server", "IP Services"),
  c("show ntp status", "Display NTP synchronization status", "IP Services"),

  // Security
  c("enable secret <password>", "Set an encrypted privileged EXEC password", "Security"),
  c("service password-encryption", "Encrypt plaintext passwords in the config", "Security"),
  c("username <name> secret <password>", "Create a local user account", "Security"),
  c("line vty 0 4", "Enter VTY line configuration mode", "Security"),
  c("login local", "Require local database authentication", "Security"),
  c("transport input ssh", "Restrict remote access to SSH only", "Security"),
  c("ip ssh version 2", "Force SSH protocol version 2", "Security"),
  c("switchport port-security", "Enable port security on an interface", "Security"),
  c("switchport port-security maximum <n>", "Set the max MAC addresses on a port", "Security"),
  c("switchport port-security violation <mode>", "Set the port security violation action", "Security"),
  c("access-list <n> permit <source>", "Create a standard numbered ACL entry", "Security"),
  c("ip access-list extended <name>", "Create a named extended ACL", "Security"),
  c("ip access-group <acl> in", "Apply an ACL inbound on an interface", "Security"),
  c("show access-lists", "Display configured ACLs and hit counters", "Security"),

  // Troubleshooting
  c("ping <address>", "Test Layer 3 reachability", "Troubleshooting"),
  c("traceroute <address>", "Trace the path packets take to a destination", "Troubleshooting"),
  c("show cdp neighbors", "Display directly connected Cisco devices", "Troubleshooting"),
  c("show mac address-table", "Display the switch MAC address table", "Troubleshooting"),
  c("show arp", "Display the ARP cache", "Troubleshooting"),
  c("show version", "Display hardware and IOS version details", "Troubleshooting"),
  c("show logging", "Display the local log buffer", "Troubleshooting"),
  c("debug ip routing", "Enable real-time routing table debug messages", "Troubleshooting"),
  c("terminal monitor", "Display debug output on a remote session", "Troubleshooting"),
];

export const commandCount = allCommands.length;
