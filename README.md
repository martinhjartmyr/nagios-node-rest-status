# RESTful nodejs service for reading nagios status

## Running

### Building and running manually
```
git clone https://github.com/martinhjartmyr/nagios-node-rest-status.git
cd nagios-node-rest-status
npm install
npm run build
STATUS_PATH=/path/to/nagios/status.dat npm start
```
The status.dat file is normally found in `/usr/local/nagios/var` but depending on host os it might be a different path.

### Running the docker image
```
docker pull martinhjartmyr/nagios-node-rest-status
docker run -d -p 3000:3000 -v /usr/local/nagios/var:/usr/src/app/nagios -e STATUS_PATH="nagios/status.dat" --name nnrs martinhjartmyr/nagios-node-rest-status
```
Note that the source volume folder path must be set to where the status.dat file is located. For example: `/usr/local/nagios/var`

## Retrieving the JSON data

### Stats
```
http://server-ip:3000/stats
```
Displays the number of hosts and services (including failing)

### Hosts
```
http://server-ip:3000/hosts
```
Displays information about all the hosts

```
http://server-ip:3000/hosts/failing
```
Displays only the failing hosts

### Services
```
http://server-ip:3000/services
```
Displays information about all the services

```
http://server-ip:3000/services/failing
```
Displays only the failing services
