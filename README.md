[![Build Status](https://travis-ci.org/CDCgov/fdns-ms-stubbing.svg?branch=master)](https://travis-ci.org/CDCgov/fdns-ms-stubbing)

# FDNS Stubbing Microservice

This repository contains a stubbing service for testing against the various endpoints of the FDNS Microservices without running the full microservices in the background. This microservice is intended to be run as a Docker container via docker-compose (or similar) to run automated tests against the endpoints in other FDNS microservices or apps.

## Notes on parameter or query values in testing

Apps running tests against this service might need to pass along parameters or required queries. If the value matters, this microservice expects you to use a string of "valid", except in the case of a Mongo ObjectId which expects a value of "sample-object-id".

The actual data passed along is rarely validated unless it would break the services. Some of the data returned is random and not related to the data passed into the query, but it is usually formatted in the way you can expect a response from the microservice.

This service can also validate against secure_mode, if required.

## Running locally

Please read the following instructions carefully for information on how to build, run and test this microservice in your local environment.

### Before you start

You will need to have the following installed before getting up and running locally:

- Docker, [Installation guides](https://docs.docker.com/install/)
- Docker Compose, [Installation guides](https://docs.docker.com/compose/install/)
- **Windows Users**: This project uses `Make`, please see [Cygwin](http://www.cygwin.com/) for running commands in this README

### Build

First you'll need to build the image, to do so just run the following command:

```sh
make docker-build
```

### Run

Now you'll be able to run the image, you can easily do so by running the following command:

```sh
make docker-run
```

### Test

To check if the microservice is running, just open the following URL in your browser:

[http://127.0.0.1:3002/](http://127.0.0.1:3002/)

### OAuth 2 Configuration

This microservice is configurable to emulate the endpoints with an OAuth 2 provider.

To do this, you may run

```sh
make docker-build-secure
```

## Public Domain

This repository constitutes a work of the United States Government and is not
subject to domestic copyright protection under 17 USC § 105. This repository is in
the public domain within the United States, and copyright and related rights in
the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
All contributions to this repository will be released under the CC0 dedication. By
submitting a pull request you are agreeing to comply with this waiver of
copyright interest.

## License

The repository utilizes code licensed under the terms of the Apache Software
License and therefore is licensed under ASL v2 or later.

This source code in this repository is free: you can redistribute it and/or modify it under
the terms of the Apache Software License version 2, or (at your option) any
later version.

This source code in this repository is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the Apache Software License for more details.

You should have received a copy of the Apache Software License along with this
program. If not, see http://www.apache.org/licenses/LICENSE-2.0.html

The source code forked from other open source projects will inherit its license.

## Privacy

This repository contains only non-sensitive, publicly available data and
information. All material and community participation is covered by the
Surveillance Platform [Disclaimer](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md)
and [Code of Conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md).
For more information about CDC's privacy policy, please visit [http://www.cdc.gov/privacy.html](http://www.cdc.gov/privacy.html).

## Contributing

Anyone is encouraged to contribute to the repository by [forking](https://help.github.com/articles/fork-a-repo)
and submitting a pull request. (If you are new to GitHub, you might start with a
[basic tutorial](https://help.github.com/articles/set-up-git).) By contributing
to this project, you grant a world-wide, royalty-free, perpetual, irrevocable,
non-exclusive, transferable license to all users under the terms of the
[Apache Software License v2](http://www.apache.org/licenses/LICENSE-2.0.html) or
later.

All comments, messages, pull requests, and other submissions received through
CDC including this GitHub page are subject to the [Presidential Records Act](http://www.archives.gov/about/laws/presidential-records.html)
and may be archived. Learn more at [http://www.cdc.gov/other/privacy.html](http://www.cdc.gov/other/privacy.html).

## Records

This repository is not a source of government records, but is a copy to increase
collaboration and collaborative potential. All government records will be
published through the [CDC web site](http://www.cdc.gov).

## Notices

Please refer to [CDC's Template Repository](https://github.com/CDCgov/template)
for more information about [contributing to this repository](https://github.com/CDCgov/template/blob/master/CONTRIBUTING.md),
[public domain notices and disclaimers](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md),
and [code of conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md).
