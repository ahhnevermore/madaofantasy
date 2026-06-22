import { Card, CardActionArea, CardContent, Typography, Box } from "@mui/material";

interface DashboardCardProps {
  title: string;
  description: string;
  onClick: () => void;
  backgroundImage?: string;
}

export default function DashboardCard({
  title,
  description,
  onClick,
  backgroundImage,
}: DashboardCardProps) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <Box
          sx={{
            minHeight: 140,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",

            ...(backgroundImage && {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }),
          }}
        >
          {backgroundImage && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}
            />
          )}

          <CardContent
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
              color: backgroundImage ? "white" : "inherit",
            }}
          >
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>

            <Typography variant="body1">{description}</Typography>
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
