FROM mcr.microsoft.com/mssql/server:2019-latest

ENV CHECK_POLICY=OFF
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=yourStrong(!)Password
ENV MSSQL_PID=Express

COPY ./setup.sql /setup_scripts/setup.sql

RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P ${SA_PASSWORD} -i /setup_scripts/setup.sql \
    && pkill sqlservr 

CMD ["/opt/mssql/bin/sqlservr"]