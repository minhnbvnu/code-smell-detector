function applyPose (pose, object3D, offset) {
    object3D.position.copy(pose.transform.position);
    object3D.quaternion.copy(pose.transform.orientation);

    tempVec3.copy(offset);
    tempQuaternion.copy(pose.transform.orientation);
    tempVec3.applyQuaternion(tempQuaternion);
    object3D.position.sub(tempVec3);
  }