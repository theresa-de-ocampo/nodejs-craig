/**
 * https://www.geeksforgeeks.org/node-js-dns-lookup-method/
 *
 * The dns.lookup() method is an in-built API of the DNS module which is used to resolve IP
 * addresses of the specified hostname for given parameters.
 */

import dns from "dns";

/**
 * The hints property is used to specify the query hints for the DNS lookup. In this case, it is a
 * bitwise OR of the two constants from the DNS module.
 *
 * dns.ADDRCONFIG - this hint tells the DNS resolver to only use addresses that are configured to
 *    the local system. It helps in selecting the appropriate address family based on the system's
 *    configuration. By "local system", it refers to the machine where the Node.js code is running.
 *
 * dns.v4MAPPED - if the IPv6 family was specified, but no IPv6 addresses were found, then return
 *    IPv4 mapped IPv6 address. This is useful for scnearios where IPv6 is preferred.
 *
 * By combining these hints with `family: 6` option, you are indicating that you prefer IPv6
 * addresses, but are open to IPv4 addresses if IPv6 is not available. The combination of these
 * hints helps in making the DNS lookup more flexible and adaptable to the system's configuration.
 */
const option1 = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED
};

dns.lookup("geeksforgeeks.org", option1, (err, address, family) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Address: ${address}  Family: IPv${family}`);
  }
});

/**
 * dns.ALL - if `dns.V4MAPPED` is specified, return resolved IPv6 addresses as well as IPv4 mapped
 * IPv6 addresses
 */
const option2 = {
  all: true
};

dns.lookup("geeksforgeeks.org", option2, (err, address) => {
  if (err) {
    console.log(err);
  } else {
    console.dir(address, { depth: null });
  }
});

/**
 * The `dns.lookup` function uses the operating system's facilities for DNS resolution, and may not
 * necessarily perform direct communication itself.
 *
 * When you make a DNS lookup, Node.js interfaces with the underlying operating system, and the
 * behavior can vary based on the platform. On many operating system's, the DNS resolution is
 * typically handled by the system's resolver library, and Node.js leverages this functionality.
 *
 * In this context, the communication with the DNS servers and the actual resolution process may be
 * handled by the operating system's networking stack, and Node.js interacts with the results
 * provided by the OS. This approach is more efficient, and leverages the existing infrastructure
 * of the operating system for DNS resolution.
 */
