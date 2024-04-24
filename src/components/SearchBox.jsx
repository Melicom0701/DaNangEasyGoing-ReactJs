// import React,{useState} from 'react'

// const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search?";
// // const params = {
// //     q: '',
// //     format:'jsonv2',
// //     addressdetails: 'addressdetails',
// // }
// export default function SearchBox(props) {

//     const {selectPosition, setSelectPosition} = props;

//     const [searchText, setSearchText] = useState("");
//     const [listPlace,setListPlace] = useState([]);
//     return (
//         <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}   >
//             <div style={{ display: "flex" }}>
//                 <div style={{ flex: 1 }}>
//                     <OutlinedInput placeholder="Search"
//                      style={{ width: "100%" }} 
//                      value={searchText}
//                      onChange={(e) => {
//                         setSearchText(e.target.value);    
//                      }}
                  
                     
//                      />
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
//                     <Button variant="contained" color="primary" onClick={()=>{
//                         //search
//                         const params = {
//                             q: searchText,
//                             format:'json',
//                             addressdetails: 1,
//                             polygon_geojson:0,
//                         }
//                         const requestOptions ={
//                             method: 'GET',
//                             redirect: 'follow'
//                         };
//                         const queryString = new URLSearchParams(params).toString();
//                         fetch(`${NOMINATIM_URL}${queryString}`, requestOptions)
//                         .then(response => response.text())
//                         .then(result => {
//                             setListPlace(JSON.parse(result));
//                         })
//                         .catch(error => console.log('error', error));



//                     }}>
//                         Search
//                     </Button>
//                 </div>
//             </div>
//             <div style= {{padding:"10px"}}>
//                 <List component="nav" aria-label="main mailbox folders" style={{width:'80%', padding:"0 0 20px"}} >
//                     {
//                         // [1,2,3,4,5].map((item,index)=>{
//                         //     return(
//                         //         <ListItem button key={index}>
//                         //             <ListItemIcon>
//                         //                 <img src="./placeHolder.png" style={{width:"30px",height:"30px"}}/>
//                         //             </ListItemIcon>
//                         //             <ListItemText primary="bashyou" />
//                         //         </ListItem>
//                         //     )
//                         // })
//                         listPlace.map((item,index)=>{
//                             return(
//                                 <ListItem button key={item?.osm_id} onClick={()=>
//                                 {
//                                     setSelectPosition({
//                                         lat: item?.lat,
//                                         lon: item?.lon,
//                                     })
//                                 }}>
//                                     <ListItemIcon>
//                                         <img src="./placeHolder.png" style={{width:"30px",height:"30px"}}/>
//                                     </ListItemIcon>
//                                     <ListItemText primary={item?.display_name} />
//                                 </ListItem>
//                             )
//                         })
                 
//                     }
                    
//                 </List>
//                 <Divider />



//             </div>
//         </div>

//     )
// }
