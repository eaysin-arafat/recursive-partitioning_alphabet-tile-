const container = document.querySelector("#container");

function createPartition(isHorizontalSplit = false) {
  const container = document.querySelector("#container");
  const numPartitions = container.children.length;

  // Calculate ideal size based on container and number of partitions
  const idealSize = Math.min(
    container.offsetWidth / numPartitions,
    container.offsetHeight / numPartitions
  );

  const partition = document.createElement("div");
  partition.classList.add("partition");
  partition.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`;

  const buttonV = document.createElement("button");
  buttonV.textContent = "V";
  buttonV.addEventListener("click", () => splitPartition(partition, true));
  partition.appendChild(buttonV);

  const buttonH = document.createElement("button");
  buttonH.textContent = "H";
  buttonH.addEventListener("click", () => splitPartition(partition, false));
  partition.appendChild(buttonH);

  const removeButton = document.createElement("button");
  removeButton.textContent = "-";
  removeButton.addEventListener("click", () => removePartition(partition));
  partition.appendChild(removeButton);

  let resizeMouseDown = false;
  let resizeStartX = null;
  let resizeStartY = null;
  let partitionWidth = partition.offsetWidth;
  let partitionHeight = partition.offsetHeight;

  partition.addEventListener("mousedown", (e) => {
    resizeMouseDown = true;
    resizeStartX = e.clientX;
    resizeStartY = e.clientY;
  });

  partition.addEventListener("mouseup", () => {
    resizeMouseDown = false;
  });

  partition.addEventListener("mousemove", (e) => {
    if (resizeMouseDown && isHorizontalSplit) {
      const diffX = e.clientX - resizeStartX;
      partitionWidth = Math.max(100, partitionWidth + diffX);
      partition.style.width = `${partitionWidth}px`;
    } else if (resizeMouseDown && !isHorizontalSplit) {
      const diffY = e.clientY - resizeStartY;
      partitionHeight = Math.max(100, partitionHeight + diffY);
      partition.style.height = `${partitionHeight}px`;
    }
  });

  // Set width and height based on ideal size
  partition.style.width = `${idealSize}px`;
  partition.style.height = `${idealSize}px`;

  return partition;
}

function splitPartition(partition, isHorizontalSplit) {
  const newPartition = createPartition(!isHorizontalSplit);
  const parent = partition.parentNode;
  parent.insertBefore(newPartition, partition);

  if (isHorizontalSplit) {
    partition.style.width = "50%";
    newPartition.style.width = "50%";
    newPartition.style.height = `${100 - partition.offsetHeight}%`;
  } else {
    partition.style.height = "50%";
    newPartition.style.height = "50%";
    newPartition.style.width = `${100 - partition.offsetWidth}%`;
  }

  // Add buttons to the new partition
  const newButtonContainer = buttonContainer.cloneNode(true);
  newPartition.appendChild(newButtonContainer);
}

function removePartition(partition) {
  const parent = partition.parentNode;
  if (parent.children.length > 2) {
    parent.removeChild(partition);
  } else {
    alert("You cannot remove the last partition");
  }
}

// Create the initial partition with buttons
const initialPartition = createPartition();
initialPartition.style.width = "100%";
initialPartition.style.height = "100%";
container.appendChild(initialPartition);

// Create the initial button container outside the function
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");
container.appendChild(buttonContainer);
