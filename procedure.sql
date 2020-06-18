use `trainserver`;
drop procedure if exists `generateCameras`;

delimiter $$ 
use `trainserver`$$
--- 存储过程,批量录入车厢摄像头
--- author： Noel T
-- 批量录入每节车厢的摄像头,摄像头编号之间用逗号分隔
create procedure generateCameras(in cityCode int(11), in routeCode int(11), in trainType varchar(10), in car_number varchar(10), in carriage_id varchar(4), in cameras varchar(25))
  declare subwayId, arrLength int(11) default 0;
  declare camera_ids varchar(25) CHARACTER SET utf8;
  declare camera_id varchar(2) CHARACTER SET utf8;
  begin
    select id into subwayId from subway 
    where `cityCode` = cityCode and `routeCode` = routeCode and `type` = trainType and `carNumber` = car_number;
    -- 录入列车车厢信息
    INSERT INTO `carriage` (`subway_id`, `carriage_id`) value (subwayId, carriage_id);
    -- 逗号数量表示数组长度
    SET arrLength = LENGTH(cameras) - LENGTH(REPLACE(cameras,',',''));
    SET camera_ids = cameras;
    WHILE arrLength > 0 DO
      --获取分隔符前面的字符串，即摄像头编号
      SET camera_id = substr(camera_ids,1,INSTR(camera_ids,',')-1);
      -- 获取分隔符后面的摄像头编号，即剩下的摄像头编号列表
      SET camera_ids = substr(camera_ids, LENGTH(camera_id)+LENGTH(",")+1);
      SET arrLength = arrLength - 1;
      insert INTO `carriage_camera` (`subway_id`, `carriage_id`, `camera_number`) value (subwayId, carriage_id, trim(camera_id));
    END WHILE;
END $$

delimiter ;