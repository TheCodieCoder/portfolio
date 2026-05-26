import {
  SiCplusplus,
  SiMysql,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiIntellijidea,
  SiPostman
} from "react-icons/si";

import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { TbCursorText } from "react-icons/tb";

const icons = {
  java: FaJava,
  cpp: SiCplusplus,
  mysql: SiMysql,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  intellij: SiIntellijidea,
  vscode: VscVscode,
  postman: SiPostman,
  cursor: TbCursorText
};

const SkillIcon = ({ icon, color }) => {
  const Icon = icons[icon];

  return (
    <div
      className="flex items-center justify-center w-14 h-14 rounded-xl"
      style={{ color }}
    >
      {Icon ? (
        <Icon className="w-10 h-10" />
      ) : (
        <span className="text-2xl font-bold">
          {icon?.[0]?.toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default SkillIcon;