import  AppleHealthKit, { HealthKitPermissions }  from 'react-native-health';

const permission: HealthKitPermissions = {
  permissions: {
    read:[AppleHealthKit.Constants.Permissions.Steps,
       AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning],
    write:[]  
  }
}

AppleHealthKit.initHealthKit(permission, (err:any) => {
  if (err) {
    console.log(err);
    return
  }
});

const options = {
  startDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
  endDate: new Date().toISOString(),
  includeManuallyAdded: true,
};
AppleHealthKit.getStepCount(options, (err: any, results: any) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(results);
});
AppleHealthKit.getDistanceWalkingRunning(options, (err: any, results: any) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(results);
});