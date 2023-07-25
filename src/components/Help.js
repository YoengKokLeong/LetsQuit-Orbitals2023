import {
  Container,
  CssBaseline,
  Stack,
  Button,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Npc_valkyrie from "../images/Npc_valkyrie.webp";

export default function Help() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/Home");
  };

  const goShop = () => {
    navigate("/Shop");
  };

  const goSocial = () => {
    navigate("/Social");
  };

  const goHelp = () => {
    navigate("/Help");
  };

  const goInventory = () => {
    navigate("/Inventory");
  };

  const theme = createTheme({
    palette: {
      background: {
        default: "#d3dff0",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar>
          <Toolbar>
            <Stack direction="row" gap={1} sx={{ flexGrow: 1 }}>
              <Typography variant="h3" component="div" marginRight={3}>
                <strong>LetsQuit</strong>
              </Typography>
              <Button
                color="warning"
                variant="contained"
                size="small"
                onClick={goHome}
              >
                Home
              </Button>
              <Button
                color="success"
                variant="contained"
                size="small"
                onClick={goShop}
              >
                Shop
              </Button>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={goSocial}
              >
                Social
              </Button>
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={goInventory}
              >
                Inventory
              </Button>
              <Button
                color="error"
                variant="contained"
                size="small"
                onClick={goHelp}
              >
                Help
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl">
          <Stack marginTop={12} direction="column" gap={2}>
            <Typography
              marginBottom={2}
              color={"primary"}
              variant="h4"
              sx={{ textAlign: "left" }}
            >
              {" "}
              <strong>
                <u> Overview for new users</u>
              </strong>{" "}
            </Typography>
            <Typography>
              {" "}
              Need some tips on how to begin your journey Quitter? Here is a
              guide to aid you!
            </Typography>
            <Typography color={"primary"}>
              {" "}
              <strong>
                <u>Part 1: Personalising your account</u>
              </strong>
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - LetsQuit is a platform to help you quit your real-world
              addictions be it smoking, drinking, gaming or anything else
              addictive.{" "}
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - Firstly on account creation, you can set your name instead of
              your default email. And name changes can be made later on without
              any additional costs.
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - Next, Quitters are able to set their targetted addiction that
              they would like to quit. This helps personalise your profile and
              keep you motivated.{" "}
            </Typography>

            <Typography color={"primary"}>
              {" "}
              <strong>
                <u>Part 2: Introduction to your character!</u>
              </strong>
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - In LetsQuit, your character starts off as a newbie knight.{" "}
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - In order to defeat hordes of Goblins that are personifications
              of your evil addictions, check in daily on the Home page to damage
              the Goblin boss!{" "}
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - With discipline and dilligence, checking in daily will reward
              you with Xp and gold that can strengthen your character.{" "}
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - Upon defeating the Goblin boss, more gold will also be rewarded
              to you and these gold coins can be spent in the Shop for
              interesting equipment that can strengthen your character!
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - With each level up, your character gains 1 attack damage.
              Furthermore, items bought in the Shop will permanently buff your
              attack damage so do save up on those coins!
            </Typography>

            <Typography color={"primary"}>
              {" "}
              <strong>
                <u>Part 3: Social Support </u>
              </strong>
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - Losing motivation? Don't worry as through the Social page,
              fellow Quitters will be there to support you and motivate you!{" "}
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              - Simply share your problems you are currently facing and many
              Quitter alike would be there to listen to you and give advice.{" "}
            </Typography>

            <Typography color={"primary"}>
              {" "}
              <strong>
                <u>Important points to note </u>
              </strong>
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              LetsQuit is a gamified platform to gather people of the right
              mindset to quit a harmful and damaging habit/addiction. However,
              this platform can and only aims to provide Quitters with
              motivation and support towards their goals. LetsQuit's impact on a
              Quitter ultimately lies in the mindset and integrity of a Quitter.
              With that being said, cheating the system could get your account
              banned or removed as well.{" "}
            </Typography>

            <Typography color={"primary"}>
              {" "}
              <strong>
                <u>Important points to note </u>
              </strong>
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              {" "}
              For more info, feel free to take a look at LetsQuit's ReadMe
            </Typography>
            <Typography color={"red"} sx={{ textAlign: "left" }}>
              {" "}
              https://docs.google.com/document/d/18oRGmiE_STnrqidqEmXSgRIIunGQJ3vBFVSLLMNnAOE/edit?usp=sharing{" "}
            </Typography>
          </Stack>
          <img src={Npc_valkyrie} width={350} height={300} alt="" />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}
