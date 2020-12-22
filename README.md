# What is PALEO-SEAL?
PALEO-SEAL is an easily deployable and scalable web interface that allows the visualization and download of Holocene sea-level index points. The data displayed in the interface are hosted in a MySQL database. The database structure follows the template of the HOLSEA project (Long-form version, that can be retrieved from <a href="https://www.holsea.org/archive-your-data">www.holsea.org</a>), and is described by Khan et al., 2019<sup>[1](#Khan2019)</sup>.

# Quick video tour
We prepared a quick video tour of PALEO-SEAL, to give a quick demonstration of its functionalities.

[![PALEO-SEAL Video](http://img.youtube.com/vi/A3ZGQh7foZI/0.jpg)](http://www.youtube.com/watch?v=A3ZGQh7foZI "PALEO-SEAL")

# How can I use PALEO-SEAL?
With PALEO-SEAL, you can create your own website to visualize and download Holocene sea-level data within minutes. The tool offers a basic template, and to furhter style your page you will need some basic knowledge of HTML and CSS. To setup your database, you will need some basic knowledge of mySQL and a remote server supporting mySQL databases.

<img src="https://user-images.githubusercontent.com/16379400/95067596-5c9d2c00-0704-11eb-9b87-096525378671.JPG" width="30%"></img> <img src="https://user-images.githubusercontent.com/16379400/95067597-5dce5900-0704-11eb-9ae5-99768ea6d878.JPG" width="30%"></img> <img src="https://user-images.githubusercontent.com/16379400/95067599-5dce5900-0704-11eb-8a1e-a35ab7bc6604.JPG" width="30%"></img> 

# What can I do with PALEO-SEAL?
The sea-level data in the database can be accessed either via a Map or via a Data Explorer interface. Both offer tools to filter data according to data type, Region, Sub-Region, Reference, Publication year and Dating technique. An option to visualize all samples in the database is also given. The Map and Data Explorer are connected, therefore any filter applied on the first will be applied to the second and vice-versa. Once selected, the data can be visualized either in the Map or in an Age/RSL plot in the Data Explorer. Sea-level index points can be added one-by-one or altogether to the export list. All samples added to the export list can be then downloaded as CSV files.

# Quick start
To deploy your own instance of PALEO-SEAL, follow these simple steps.
1. <b>Prepare and deploy the mySQL database.</b> The data that will be shown in PALEO-SEAL need to be hosted on a remote server. You can chose any commercial or non-commercial service offering mySQL hosting. The only privileges needed by the interface are "SELECT" and "SHOW VIEW". As the user name will be visible to anyone, we strongly suggest to create a user with only these minimal privileges dedicated to the PALEO-SEAL interface. Once the database is created, run the SQL command "create table", included in the mysql folder. This will create 79 fields, reproducing the HOLSEA data table in the mySQL database. Fields headers in the database are coded as alphanumeric codes, corresponding to the fields in the HOLSEA database. To obtain descriptions of each field, you can refer to the "data_headers_lookup" file in the "data/lookups" folder.
2. <b>Fill the database with your data.</b> Import your data into the mySQL database, always following the same template.
3. <b>Modify the connection string.</b> Navigate to "scripts/data/connect.php" and open the file with a text editor. Edit line 3 to connect to your database as follows:
```
$con=mysqli_connect("SERVER NAME","USERNAME","PASSWORD","DATABASE", "PORT");
```
4. <b>Style your webpage.</b> You can use HTML and CSS to set the style and content of your PALEO-SEAL application. Here some hints on what to modify:
  * The default location for images is the folder "\common\img". Here, change the "logo.svg" file to change the application logo.
  * Webpages composing the application are contained in the folder "\pages". Text and content can be edited from here.
  * Expert use only: to change the page style modify the "\common\css\appearance.css" file and, if necessary, the "index.php" file.
5. <b>Deploy your application.</b> Deploy your application on a web server that supports PHP 7.0. Just upload your application to a folder allowing public access, and you are done! Your PALEO-SEAL application will be available online.

# Working example
We developed PALEO-SEAL to support a project based in South East Asia. As such, we include an example displaying the dataset published in Mann et al., 2019<sup>[2](#Mann2019)</sup>, that includes sea-level datapoints from Southeast Asia, Maldives, India and Sri Lanka. The PALEO-SEAL example is hosted <a href="https://warmcoasts.eu/paleo-seal/#!/">here</a>. 

# Acknowledgments
If you use this tool we kindly ask you to include this statement in your website: *" This website was developed using PALEO-SEAL, a results of the SEASCHANGE project (DFG RO 5245/1-1 ). The interface builds on the data structure compiled by the HOLSEA project, funded by INQUA, the International Union for Quaternary Research. PALEO-SEAL was coded by Jan Drechsel (MSc, IT consultant), under scientific supervision of Dr. Alessio Rovere (PhD, MARUM, University of Bremen).*

# License
Copyright 2020 Jan Drechsel

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## References
<a name="Khan2019"><sup>1</sup></a> Khan, N.S., Horton, B.P., Engelhart, S., Rovere, A., Vacchi, M., Ashe, E.L., Törnqvist, T.E., Dutton, A., Hijma, M.P. and Shennan, I., 2019. Inception of a global atlas of sea levels since the Last Glacial Maximum. Quaternary Science Reviews, 220, pp.359-371.

<a name="Mann2019"><sup>2</sup></a> Mann, T., Bender, M., Lorscheid, T., Stocchi, P., Vacchi, M., Switzer, A.D. and Rovere, A., 2019. Holocene sea levels in southeast Asia, Maldives, India and Sri Lanka: the SEAMIS database. Quaternary Science Reviews, 219, pp.112-125. 


Version 1.0.0 [Release]


