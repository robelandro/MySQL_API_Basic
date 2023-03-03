#!/usr/local/bin/node
function fetchData() {
    fetch('http://127.0.0.1:5000/users')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        console.log(data);
        // do something with the data
      })
      .catch(error => {
        console.error(error);
      });
  }
function postData() {
    fetch('http://127.0.0.1:5000/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'LastName': 'Doe',
          'FirstName': 'John',
          'Address': '123 Main St',
          'City': 'Anytown'
        })
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
}

// copy data form api of https://jsonplaceholder.typicode.com/users
function copyData() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        for (let index = 0; index < data.length; index++) {
          const postData = {
            name: data[index].name,
            username: data[index].username,
            email: data[index].email,
            city: data[index].address.city,
            phone: data[index].phone
          };
          console.log(JSON.stringify(postData));
          fetch('http://127.0.0.1:5000/add_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          })
          .then(response => {
            if (response.ok) {
              console.log('Data sent successfully');
            } else {
              throw new Error('Failed to send data');
            }
          })
          .catch(error => {
            console.error(error);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

function deleteData() {
    // Replace <user_id> with the ID of the user you want to delete
    const user_id = "1063fd10-80c5-4763-86b8-91dbcfa60ce9";

    fetch(`http://127.0.0.1:5000/delete_user/${user_id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          console.log("User deleted successfully");
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch(error => {
        console.error(error);
      });

}

function updateUser(userId, userData) {
    fetch(`http://localhost:5000/update_user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        console.log('User updated successfully.');
      } else {
        throw new Error('Failed to update user.');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  // Example usage
  const userId = 'f4980f6c-5eea-4c86-a3cf-f322562486b1';
  const userData = {
    name: 'John Doe',
    username: 'jdoe',
    email: 'jdoe@example.com',
    city: 'New York',
    phone: '555-555-5555'
  };

updateUser(userId, userData);
  
// copyData();
//deleteData();